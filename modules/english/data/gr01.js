/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr01：名词与冠词
 *
 * 数据口径（M5）：window.ENG_CH["gr01"] = { id, title, units[] }，
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
window.ENG_CH["gr01"] = {
  id: "gr01",
  title: "名词与冠词",
  /* 例句索引：键 = D3 台账例句 id（正例）；文本与台账逐字一致。 */
  sentences: {
    "gr01.1.1-e1": { en: "I drink milk every day.", zh: "我每天喝牛奶。", reg: "通用",
      tagged: [ { w: "milk", role: "object", label: "宾语·不可数名词" } ] },
    "gr01.1.1-e2": { en: "She has two apples.", zh: "她有两个苹果。", reg: "通用",
      tagged: [ { w: "two apples", role: "object", label: "宾语·可数名词" } ] },
    "gr01.1.1-e3": { en: "There is some water in the glass.", zh: "杯子里有些水。", reg: "通用",
      fn: "There be 表“有”，第 12 章细讲。",
      tagged: [ { w: "water", role: "subject", label: "主语·不可数名词" } ] },
    "gr01.1.1-e4": { en: "I have many books.", zh: "我有很多书。", reg: "通用",
      tagged: [ { w: "books", role: "object", label: "宾语·可数名词" } ] },
    "gr01.1.1-e5": { en: "Can I have a piece of bread?", zh: "我能要一片面包吗？", reg: "口语",
      tagged: [ { w: "a piece of bread", role: "object", label: "宾语·不可数名词" } ] },
    "gr01.1.1-e6": { en: "How much water do you need?", zh: "你需要多少水？", reg: "通用",
      tagged: [ { w: "water", role: "object", label: "宾语·不可数名词" } ] },
    "gr01.1.1-e7": { en: "How many apples do you want?", zh: "你想要几个苹果？", reg: "通用",
      tagged: [ { w: "apples", role: "object", label: "宾语·可数名词" } ] },
    "gr01.1.2-e1": { en: "The children's books are on the desk.", zh: "孩子们的书在桌上。", reg: "通用",
      tagged: [ { w: "children's", role: "attrib", label: "定语·所有格" }, { w: "books", role: "subject", label: "主语·复数名词" } ] },
    "gr01.1.2-e2": { en: "The children are playing.", zh: "孩子们在玩。", reg: "通用",
      tagged: [ { w: "children", role: "subject", label: "主语·复数名词" } ] },
    "gr01.1.2-e3": { en: "I brush my teeth every day.", zh: "我每天刷牙。", reg: "通用",
      tagged: [ { w: "teeth", role: "object", label: "宾语·复数名词" } ] },
    "gr01.1.2-e4": { en: "It is a two-hour film.", zh: "这是一部两小时的电影。", reg: "通用",
      tagged: [ { w: "two-hour", role: "attrib", label: "定语·复合形容词" } ] },
    "gr01.1.2-e5": { en: "The boys' bikes are new.", zh: "男孩们的自行车是新的。", reg: "通用",
      tagged: [ { w: "boys'", role: "attrib", label: "定语·所有格" }, { w: "bikes", role: "subject", label: "主语·复数名词" } ] },
    "gr01.1.2-e6": { en: "The legs of the table are broken.", zh: "桌子腿坏了。", reg: "通用",
      tagged: [ { w: "of the table", role: "attrib", label: "定语·of 所有格" } ] },
    "gr01.1.2-e7": { en: "She has three boxes.", zh: "她有三个盒子。", reg: "通用",
      tagged: [ { w: "boxes", role: "object", label: "宾语·复数名词" } ] },
    "gr01.1.3-e1": { en: "The news is surprising.", zh: "这个消息令人惊讶。", reg: "通用",
      tagged: [ { w: "news", role: "subject", label: "主语·不可数名词" }, { w: "is", role: "verb", label: "谓语·单数" } ] },
    "gr01.1.3-e2": { en: "I have some good advice for you.", zh: "我有一些好建议给你。", reg: "通用",
      tagged: [ { w: "advice", role: "object", label: "宾语·不可数名词" } ] },
    "gr01.1.3-e3": { en: "The information is useful.", zh: "这些信息很有用。", reg: "通用",
      tagged: [ { w: "information", role: "subject", label: "主语·不可数名词" } ] },
    "gr01.1.3-e4": { en: "My family is big.", zh: "我家人口多。", reg: "通用",
      tagged: [ { w: "family", role: "subject", label: "主语·集合名词" }, { w: "is", role: "verb", label: "谓语·单数" } ] },
    "gr01.1.3-e5": { en: "My family are all teachers.", zh: "我家人都是老师。", reg: "通用",
      tagged: [ { w: "family", role: "subject", label: "主语·集合名词" }, { w: "are", role: "verb", label: "谓语·复数" } ] },
    "gr01.1.3-e6": { en: "Our team is the best.", zh: "我们队是最棒的。", reg: "通用",
      tagged: [ { w: "team", role: "subject", label: "主语·集合名词" } ] },
    "gr01.2.1-e1": { en: "I saw a dog in the park.", zh: "我在公园里看到一只狗。", reg: "通用",
      tagged: [ { w: "a", role: "art", label: "不定冠词·泛指" }, { w: "dog", role: "object", label: "宾语" } ] },
    "gr01.2.1-e2": { en: "The dog was very cute.", zh: "那只狗很可爱。", reg: "通用",
      tagged: [ { w: "The", role: "art", label: "定冠词·特指" }, { w: "dog", role: "subject", label: "主语" } ] },
    "gr01.2.1-e3": { en: "She is a teacher.", zh: "她是一名老师。", reg: "通用",
      tagged: [ { w: "a", role: "art", label: "不定冠词" }, { w: "teacher", role: "complem", label: "表语" } ] },
    "gr01.2.1-e4": { en: "The moon is round tonight.", zh: "今晚的月亮很圆。", reg: "通用",
      tagged: [ { w: "The", role: "art", label: "定冠词·独一无二" }, { w: "moon", role: "subject", label: "主语" } ] },
    "gr01.2.1-e5": { en: "I have a dog.", zh: "我有一只狗。", reg: "通用",
      tagged: [ { w: "a", role: "art", label: "不定冠词" }, { w: "dog", role: "object", label: "宾语" } ] },
    "gr01.2.1-e6": { en: "An apple a day keeps the doctor away.", zh: "每天一苹果，医生远离我。", reg: "通用",
      tagged: [ { w: "An", role: "art", label: "不定冠词·元音前" }, { w: "apple", role: "subject", label: "主语" } ] },
    "gr01.2.2-e1": { en: "They play basketball after school.", zh: "他们放学后打篮球。", reg: "通用",
      tagged: [ { w: "basketball", role: "object", label: "宾语·零冠词" } ] },
    "gr01.2.2-e2": { en: "I go to school by bike.", zh: "我骑自行车去上学。", reg: "通用",
      tagged: [ { w: "school", role: "adverb", label: "状语·零冠词" } ] },
    "gr01.2.2-e3": { en: "She plays chess on Sunday.", zh: "她周日下象棋。", reg: "通用",
      tagged: [ { w: "chess", role: "object", label: "宾语·零冠词" } ] },
    "gr01.2.2-e4": { en: "We have breakfast at seven.", zh: "我们七点吃早饭。", reg: "通用",
      tagged: [ { w: "breakfast", role: "object", label: "宾语·零冠词" } ] },
    "gr01.2.2-e5": { en: "He is at home now.", zh: "他现在在家。", reg: "通用",
      tagged: [ { w: "at home", role: "adverb", label: "状语·固定搭配" } ] },
    "gr01.2.2-e6": { en: "I go to the school to meet my teacher.", zh: "我去学校见老师。", reg: "通用",
      tagged: [ { w: "the school", role: "adverb", label: "状语·特指" } ] },
    "gr01.2.3-e1": { en: "I have some apples.", zh: "我有一些苹果。", reg: "通用",
      tagged: [ { w: "some", role: "attrib", label: "定语·some" }, { w: "apples", role: "object", label: "宾语·可数名词" } ] },
    "gr01.2.3-e2": { en: "I don't have any money.", zh: "我没有钱。", reg: "通用",
      tagged: [ { w: "any", role: "attrib", label: "定语·any" }, { w: "money", role: "object", label: "宾语·不可数名词" } ] },
    "gr01.2.3-e3": { en: "Would you like some tea?", zh: "要来点茶吗？", reg: "口语",
      tagged: [ { w: "some", role: "attrib", label: "定语·some（例外）" }, { w: "tea", role: "object", label: "宾语·不可数名词" } ] },
    "gr01.2.3-e4": { en: "Do you have any questions?", zh: "你有什么问题吗？", reg: "通用",
      tagged: [ { w: "any", role: "attrib", label: "定语·any" }, { w: "questions", role: "object", label: "宾语·可数名词" } ] },
    "gr01.2.3-e5": { en: "She has many friends.", zh: "她有很多朋友。", reg: "通用",
      tagged: [ { w: "many", role: "attrib", label: "定语·many" }, { w: "friends", role: "object", label: "宾语·可数名词" } ] },
    "gr01.2.3-e6": { en: "There isn't much milk.", zh: "没有多少牛奶了。", reg: "通用",
      tagged: [ { w: "much", role: "attrib", label: "定语·much" }, { w: "milk", role: "subject", label: "主语·不可数名词" } ] },
  },
  units: [
    {
      id: "gr01-u1",
      title: "名词",
      lessons: [
      {
        id: "gr01.1.1",
        title: "可数与不可数",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr01.1.1-p1",
              kind: "observe",
              title: "数数测试：milk 和 apples 有什么不一样？",
              point: "能数的叫可数名词，不能数的叫不可数名词——这是英语的'数数测试'。",
              sentences: [
                {
                  id: "gr01.1.1-e1",
                  en: "I drink milk every day.",
                  zh: "我每天喝牛奶。",
                  reg: "通用",
                  tagged: [ { w: "milk", role: "object", label: "宾语·不可数名词" } ]
                },
                {
                  id: "gr01.1.1-e2",
                  en: "She has two apples.",
                  zh: "她有两个苹果。",
                  reg: "通用",
                  tagged: [ { w: "two apples", role: "object", label: "宾语·可数名词" } ]
                },
                {
                  id: "gr01.1.1-e3",
                  en: "There is some water in the glass.",
                  zh: "杯子里有些水。",
                  reg: "通用",
                  fn: "There be 表“有”，第 12 章细讲。",
                  tagged: [ { w: "water", role: "subject", label: "主语·不可数名词" } ]
                }
              ],
              guess: {
                q: "milk/water 和 apples 有什么根本不一样？",
                options: [ "milk/water 不能数个数，apples 能数", "milk/water 更贵", "没有不一样" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作可数/不可数分类标注 ---------- */
            {
              id: "gr01.1.1-p2",
              kind: "interact",
              title: "数数测试：贴标签",
              exploreTip: "给词块贴标签：能数个数的贴'可数名词'，不能数的贴'不可数名词'。water 像水一样，数不了'一个水'。",
              point: "贴完记住：a/an 只给可数名词的单数；不可数名词前面不加 a/an。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "I",
                        role: "subject",
                        label: "主语"
                      },
                      {
                        w: "have",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "an apple",
                        role: "count",
                        label: "可数名词"
                      },
                      {
                        w: "some water",
                        role: "uncount",
                        label: "不可数名词"
                      }
                    ],
                    slots: [
                      {
                        role: "subject",
                        label: "主语"
                      },
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "count",
                        label: "可数名词"
                      },
                      {
                        role: "uncount",
                        label: "不可数名词"
                      }
                    ],
                    hint: "an apple 能数（一个苹果），some water 不能数——water 前面不能加 a。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：可数/不可数 + 条件卡 + 反例 ---------- */
            {
              id: "gr01.1.1-p3",
              kind: "explain",
              title: "可数与不可数：先数数，再选词",
              lead: "还记得吗？上一页 water 你贴了'不可数'——水不能数'一个水'，advice 也一样。",
              point: "这就是可数与不可数：先数数测试，再决定加不加 a、有没有复数。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr01.1.1-e1", "gr01.1.1-e2", "gr01.1.1-e5" ],
                  note: "先看现象：milk/water/bread 都不能直接数。"
                },
                {
                  type: "idcard",
                  rule: "名词分可数与不可数：可数名词有单复数（apple/apples），单数前可加 a/an；不可数名词（water/milk/advice）无复数，前面不加 a/an。",
                  condition: "数数测试：能回答'几个'的就是可数。不可数名词要计量，用 a piece of / a glass of 等量词。a few/few + 可数复数；a little/little + 不可数。"
                },
                {
                  type: "bridge",
                  zh: "汉语'一个建议''一些水'，'个'字通用，不用分可数不可数。",
                  en: "英语不一样：advice 像水一样不可数，不能说 a advice / advices——要说 a piece of advice（一'片'建议）。",
                  unbridge: "这是英语的数数规矩：先数数，再选词。"
                },
                {
                  type: "contrast",
                  wrong: "I want a water.",
                  wrongZh: "（✗ 错句：water 不可数）",
                  right: "I want some water. / I want a glass of water.",
                  why: "water 不可数，不能加 a——要么 some，要么用量词 a glass of。"
                },
                {
                  type: "contrast",
                  wrong: "He gave me some advices.",
                  wrongZh: "（✗ 错句：advice 无复数）",
                  right: "He gave me some advice.",
                  why: "advice 不可数，没有复数形式——'一个建议'是 a piece of advice。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr01.1.1-p4",
              kind: "quiz",
              title: "练一练：数数测试",
              point: "自查：a/an + 单数可数；many + 可数复数；much/a little + 不可数。",
              questions: [
                { type: "choice", stem: "下面哪个是不可数名词？", options: ["apple", "water", "book"], answer: 1, tip: "水不能数“一个水”——water/milk/advice 都不可数。" },
                { type: "choice", stem: "下面哪句对？", options: ["I want a water.", "I want some water.", "I want a waters."], answer: 1, tip: "water 不可数：不加 a，无复数——要么 some，要么用量词 a glass of。" },
                { type: "choice", stem: "“advice（建议）”怎么用才对？", options: ["a advice", "some advices", "a piece of advice"], answer: 2, tip: "advice 像水一样不可数：a piece of advice（一“片”建议）。" },
                { type: "fill", stemBefore: "I don't have", stemAfter: "money.（否定句，“一些”）", answer: "any", accept: ["any"], tip: "some 在否定句里是“黑户”：否定句 some → any。" },
                { type: "choice", stem: "“a few”后面跟什么？", options: ["可数名词复数", "不可数名词", "单数名词"], answer: 0, tip: "a few / few + 可数复数（a few apples）；a little / little + 不可数。" }
              ]
            }
        ]
      },
      {
        id: "gr01.1.2",
        title: "名词复数与所有格",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr01.1.2-p1",
              kind: "observe",
              title: "复数变形：child→children，box→boxes",
              point: "复数有规则变化（-s/-es），也有不规则变化（child→children）——后者要单记。",
              sentences: [
                {
                  id: "gr01.1.2-e2",
                  en: "The children are playing.",
                  zh: "孩子们在玩。",
                  reg: "通用",
                  tagged: [ { w: "children", role: "subject", label: "主语·复数名词" } ]
                },
                {
                  id: "gr01.1.2-e7",
                  en: "She has three boxes.",
                  zh: "她有三个盒子。",
                  reg: "通用",
                  tagged: [ { w: "boxes", role: "object", label: "宾语·复数名词" } ]
                },
                {
                  id: "gr01.1.2-e1",
                  en: "The children's books are on the desk.",
                  zh: "孩子们的书在桌上。",
                  reg: "通用",
                  tagged: [ { w: "children's", role: "attrib", label: "定语·所有格" }, { w: "books", role: "subject", label: "主语·复数名词" } ]
                }
              ],
              guess: {
                q: "child→children、box→boxes，复数变化有什么规律？",
                options: [ "都直接加 -s", "有的加 -s/-es，有的整个换词", "都没有规律" ],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作所有格/复数辨析标注 ---------- */
            {
              id: "gr01.1.2-p2",
              kind: "interact",
              title: "boys' vs bikes：所有格还是复数？",
              exploreTip: "boys' 和 bikes 长得像，但一个是'所有格'（谁的），一个是'复数'（几个）——别认错。",
              point: "-s 管'几个'，-'s 管'谁的'——先看有没有一撇，再看一撇在哪。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "boys'",
                        role: "poss",
                        label: "所有格"
                      },
                      {
                        w: "bikes",
                        role: "plural",
                        label: "复数名词"
                      },
                      {
                        w: "are",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "new",
                        role: "complem",
                        label: "表语"
                      }
                    ],
                    slots: [
                      {
                        role: "poss",
                        label: "所有格（谁的）"
                      },
                      {
                        role: "plural",
                        label: "复数名词（几个）"
                      },
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "complem",
                        label: "表语"
                      }
                    ],
                    hint: "一撇之差：boys'（男孩们的）有一撇，是所有格；bikes（自行车们）没撇，是复数。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：复数规则 + 所有格 + 条件卡 ---------- */
            {
              id: "gr01.1.2-p3",
              kind: "explain",
              title: "复数与所有格：-s 管'几个'，-'s 管'谁的'",
              lead: "还记得吗？上一页 boys'（谁的）和 bikes（几个）长得像，身份不同——一撇定身份。",
              point: "这就是复数与所有格：-s 管'几个'，-'s 管'谁的'，不规则的单记。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr01.1.2-e2", "gr01.1.2-e7", "gr01.1.2-e1" ],
                  note: "先看现象：复数管'几个'，所有格管'谁的'。"
                },
                {
                  type: "idcard",
                  rule: "名词复数：一般 -s；s/x/ch/sh 结尾 -es；辅音+y 变 ies；不规则（child→children, foot→feet）单记。所有格：单数 -'s；复数 s 结尾加 -s'；无生命用 of。",
                  condition: "复数答'几个'，所有格答'谁的'。two-hour 作定语用单数加连字符。"
                },
                {
                  type: "spell",
                  title: "复数与所有格速查：",
                  items: [
                    "规则三形：-s（books）、-es（boxes）、y→ies（babies）",
                    "不规则单记：child→children，foot→feet，tooth→teeth",
                    "所有格：单数 -'s（boy's），复数 s 结尾加一撇（boys'）",
                    "无生命多用 of：the legs of the table"
                  ]
                },
                {
                  type: "bridge",
                  zh: "汉语'孩子们''孩子的'靠'们''的'区分，复数和所有格界限清楚。",
                  en: "英语里 -s 又管复数又管所有格：boys（几个）vs boy's（他的）vs boys'（他们的）——一撇之差，意思全变。",
                  unbridge: "这是英语的 -s 规矩：先看有没有一撇，再看位置。"
                },
                {
                  type: "contrast",
                  wrong: "The childs are happy.",
                  wrongZh: "（✗ 错句：不规则复数）",
                  right: "The children are happy.",
                  why: "child→children 不规则，不能加 -s。"
                },
                {
                  type: "contrast",
                  wrong: "It is a two hours' film.",
                  wrongZh: "（✗ 错句：复合形容词）",
                  right: "It is a two-hour film.",
                  why: "two-hour 作定语是形容词，用单数加连字符。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr01.1.2-p4",
              kind: "quiz",
              title: "练一练：-s 的身份",
              point: "自查：复数先看结尾字母；所有格先看单复数，再看一撇位置。",
              questions: [
                { type: "choice", stem: "“box”的复数是？", options: ["boxs", "boxes", "boxies"], answer: 1, tip: "s/x/ch/sh 结尾加 -es：boxes。" },
                { type: "choice", stem: "“baby”的复数是？", options: ["babys", "babyes", "babies"], answer: 2, tip: "辅音 + y：去 y 变 ies——babies。" },
                { type: "choice", stem: "“男孩们的（the boys 所有格）”怎么写？", options: ["boy's", "boys'", "boyes'"], answer: 1, tip: "复数 s 结尾的所有格：只加一撇——boys'（他们的）。" },
                { type: "choice", stem: "“the legs of the table（桌腿）”为什么用 of？", options: ["因为 table 复数", "无生命的东西多用 of 表所有", "随便用的"], answer: 1, tip: "无生命多用 of：the legs of the table（桌子的腿）。" },
                { type: "fill", stemBefore: "child 的复数是", stemAfter: "。（不规则，单记）", answer: "children", accept: ["children"], tip: "不规则单记：child → children，foot → feet。" }
              ]
            }
        ]
      },
      {
        id: "gr01.1.3",
        title: "易混名词辨析",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr01.1.3-p1",
              kind: "observe",
              title: "news 以 s 结尾，谓语为什么用 is？",
              point: "以 s 结尾≠复数：news/advice/information 都是不可数名词，谓语永远单数。",
              sentences: [
                {
                  id: "gr01.1.3-e1",
                  en: "The news is surprising.",
                  zh: "这个消息令人惊讶。",
                  reg: "通用",
                  tagged: [ { w: "news", role: "subject", label: "主语·不可数名词" }, { w: "is", role: "verb", label: "谓语·单数" } ]
                },
                {
                  id: "gr01.1.3-e4",
                  en: "My family is big.",
                  zh: "我家人口多。",
                  reg: "通用",
                  tagged: [ { w: "family", role: "subject", label: "主语·集合名词" }, { w: "is", role: "verb", label: "谓语·单数" } ]
                },
                {
                  id: "gr01.1.3-e5",
                  en: "My family are all teachers.",
                  zh: "我家人都是老师。",
                  reg: "通用",
                  tagged: [ { w: "family", role: "subject", label: "主语·集合名词" }, { w: "are", role: "verb", label: "谓语·复数" } ]
                }
              ],
              guess: {
                q: "news 以 s 结尾，谓语为什么用 is 不用 are？",
                options: [ "news 是不可数名词，没有复数", "news 是单数名词", "is 写错了" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作不可数/谓语单复数标注 ---------- */
            {
              id: "gr01.1.3-p2",
              kind: "interact",
              title: "news：长得像复数，其实不是",
              exploreTip: "给词块贴标签。news 长得像复数，其实是不可数名词——谓语必须用单数 is。",
              point: "记住三个'假复数'：news、advice、information——永远单数谓语。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "The news",
                        role: "uncount",
                        label: "不可数名词"
                      },
                      {
                        w: "is",
                        role: "verb-sg",
                        label: "单数谓语"
                      },
                      {
                        w: "surprising",
                        role: "complem",
                        label: "表语"
                      }
                    ],
                    slots: [
                      {
                        role: "uncount",
                        label: "不可数名词"
                      },
                      {
                        role: "verb-sg",
                        label: "单数谓语"
                      },
                      {
                        role: "complem",
                        label: "表语"
                      }
                    ],
                    hint: "news 没有复数形式——以 s 结尾不代表复数，谓语永远单数。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：易混名词 + 条件卡 + 反例 ---------- */
            {
              id: "gr01.1.3-p3",
              kind: "explain",
              title: "易混名词：不可数永远单数，集合名词看强调",
              lead: "还记得吗？上一页 news 以 s 结尾，你却给它贴了'不可数'、给 is 贴了'单数'——像复数不是复数。",
              point: "这就是易混名词：不可数永远单数；集合名词看强调整体还是成员。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr01.1.3-e1", "gr01.1.3-e4", "gr01.1.3-e5" ],
                  note: "先看现象：family 一会儿 is 一会儿 are。"
                },
                {
                  type: "idcard",
                  rule: "advice/information/news 是不可数名词，无复数，谓语用单数。集合名词（family/team/class）：看作整体用单数（is），强调成员用复数（are）。",
                  condition: "不可数：永远单数谓语。集合名词：看说话人强调'整体'还是'成员'——意思定单复数。"
                },
                {
                  type: "bridge",
                  zh: "汉语'消息''建议'可数不可数都行，'家人'单复数不用变谓语。",
                  en: "英语不一样：news 永远单数（The news is…）；family 作整体是单数（My family is big 我家这个整体大），说成员时是复数（My family are all teachers 家人们都是老师）。",
                  unbridge: "这是英语的'数'规矩：先看词，再看说话人强调什么。"
                },
                {
                  type: "contrast",
                  wrong: "The news are bad.",
                  wrongZh: "（✗ 错句：news 无复数）",
                  right: "The news is bad.",
                  why: "news 不可数，没有复数——s 结尾不代表复数，谓语用单数。"
                },
                {
                  type: "contrast",
                  wrong: "My family is all teachers.",
                  wrongZh: "（✗ 错句：强调成员用复数）",
                  right: "My family are all teachers.",
                  why: "想说'家人们'，family 就按复数走，谓语用 are。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr01.1.3-p4",
              kind: "quiz",
              title: "练一练：单数还是复数？",
              point: "自查：见 advice/information/news，直接单数谓语；见 family/team，先问自己强调整体还是成员。",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["The news are bad.", "The news is bad.", "The news be bad."], answer: 1, tip: "news 不可数，没有复数——s 结尾不代表复数，谓语永远单数。" },
                { type: "choice", stem: "“My family is big.”（说“我家这个整体大”）谓语用？", options: ["is", "are", "be"], answer: 0, tip: "集合名词看强调：说“整体”用单数 is。" },
                { type: "choice", stem: "“My family ___ all teachers.”（强调“家人们”）", options: ["is", "are", "be"], answer: 1, tip: "强调“成员”用复数 are：My family are all teachers。" },
                { type: "fill", stemBefore: "The advice", stemAfter: "useful.（advice 不可数，谓语用单数）", answer: "is", accept: ["is"], tip: "advice/information/news 不可数：永远单数谓语。" },
                { type: "choice", stem: "“information”怎么用才对？", options: ["an information", "some informations", "some information"], answer: 2, tip: "information 不可数：无复数，不加 a——some information。" }
              ]
            }
        ]
      }
      ]
    },
    {
      id: "gr01-u2",
      title: "冠词与限定词",
      lessons: [
      {
        id: "gr01.2.1",
        title: "冠词总论",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr01.2.1-p1",
              kind: "observe",
              title: "a dog → the dog：从'一只'到'那只'",
              point: "a/an 是'随便一个'（泛指），the 是'就是那个'（特指）——故事里第一次提到用 a，第二次用 the。",
              sentences: [
                {
                  id: "gr01.2.1-e1",
                  en: "I saw a dog in the park.",
                  zh: "我在公园里看到一只狗。",
                  reg: "通用",
                  tagged: [ { w: "a", role: "art", label: "不定冠词·泛指" }, { w: "dog", role: "object", label: "宾语" } ]
                },
                {
                  id: "gr01.2.1-e2",
                  en: "The dog was very cute.",
                  zh: "那只狗很可爱。",
                  reg: "通用",
                  tagged: [ { w: "The", role: "art", label: "定冠词·特指" }, { w: "dog", role: "subject", label: "主语" } ]
                },
                {
                  id: "gr01.2.1-e3",
                  en: "She is a teacher.",
                  zh: "她是一名老师。",
                  reg: "通用",
                  tagged: [ { w: "a", role: "art", label: "不定冠词" }, { w: "teacher", role: "complem", label: "表语" } ]
                }
              ],
              guess: {
                q: "a dog 和 the dog，说的是同一只狗吗？a 和 the 有什么分工？",
                options: [ "a 是'随便一只'，the 是'就是那只'", "a 和 the 可以互换", "the 是复数" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作冠词分类标注（故事引入法） ---------- */
            {
              id: "gr01.2.1-p2",
              kind: "interact",
              title: "故事引入法：a 还是 the？",
              exploreTip: "故事引入法：第一次提到的狗（不认识）用 a，第二次（认识了）用 the。",
              point: "a/an 泛指一个，the 特指那个——先问自己：对方知道我说的是哪个吗？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "a",
                        role: "indef",
                        label: "不定冠词"
                      },
                      {
                        w: "dog",
                        role: "noun",
                        label: "名词"
                      },
                      {
                        w: "The",
                        role: "def",
                        label: "定冠词"
                      },
                      {
                        w: "dog",
                        role: "noun",
                        label: "名词"
                      }
                    ],
                    slots: [
                      {
                        role: "indef",
                        label: "不定冠词（a/an·泛指）"
                      },
                      {
                        role: "def",
                        label: "定冠词（the·特指）"
                      },
                      {
                        role: "noun",
                        label: "名词"
                      }
                    ],
                    hint: "I saw a dog. The dog was cute.——第一只狗不认识（a），第二只认识了（the）。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：冠词四分法 + 条件卡 + 反例 ---------- */
            {
              id: "gr01.2.1-p3",
              kind: "explain",
              title: "冠词总论：a 泛指，the 特指",
              lead: "还记得吗？上一页第一只狗用 a，第二只狗用 the——因为第二只我们已经认识了。",
              point: "这就是冠词四分法：a/an 泛指一个，the 特指那个，复数/不可数泛指零冠词。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr01.2.1-e1", "gr01.2.1-e2", "gr01.2.1-e4" ],
                  note: "先看现象：a→the，一次提到一次认识。"
                },
                {
                  type: "idcard",
                  rule: "a/an：泛指'一个'，用于单数可数名词首次提到；the：特指'那个'，用于再次提到或独一无二的事物；零冠词：泛指复数/不可数。",
                  condition: "a/an 只加单数可数名词（a dog，不能 a dogs）；an 用于元音音素开头（an apple, an hour）；the 用于双方都知道是哪个的时候。"
                },
                {
                  type: "bridge",
                  zh: "汉语没有冠词，'一只狗''那只狗'靠'一''那'区分，'狗'本身不变。",
                  en: "英语把'一/那'装进冠词：a dog（随便一只），the dog（就是那只）——汉语用词区分，英语用冠词区分。",
                  unbridge: "这是英语的指代规矩：先问自己——对方知道我说的是哪个吗？"
                },
                {
                  type: "contrast",
                  wrong: "I have dog.",
                  wrongZh: "（✗ 错句：漏冠词）",
                  right: "I have a dog.",
                  why: "单数可数名词不能'裸奔'：dog 前面必须有 a/an/the/my 等限定词。"
                },
                {
                  type: "contrast",
                  wrong: "The happiness is important.",
                  wrongZh: "（✗ 错句：泛指乱加 the）",
                  right: "Happiness is important.",
                  why: "泛指抽象概念（幸福）不加 the——the 只给'特指'。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr01.2.1-p4",
              kind: "quiz",
              title: "练一练：a 还是 the？",
              point: "自查：单数可数名词前不能空着；先问泛指还是特指。",
              questions: [
                { type: "choice", stem: "第一次提到“一只狗”，该说？", options: ["I have dog.", "I have a dog.", "I have dogs."], answer: 1, tip: "单数可数名词不能“裸奔”：首次提到用 a/an 泛指一个。" },
                { type: "choice", stem: "再次提到“那只狗”，该说？", options: ["a dog", "the dog", "dog"], answer: 1, tip: "the = 特指“那个”：双方都知道是哪个的时候用。" },
                { type: "fill", stemBefore: "", stemAfter: "apple a day keeps the doctor away.（泛指“一个”）", answer: "An", accept: ["An", "an"], tip: "an 用于元音音素开头：an apple，an hour。" },
                { type: "choice", stem: "下面哪句对？", options: ["The happiness is important.", "Happiness is important.", "A happiness is important."], answer: 1, tip: "泛指抽象概念不加 the：Happiness is important。" },
                { type: "choice", stem: "“an”用于什么开头？", options: ["辅音字母", "元音音素（如 an hour）", "任何名词"], answer: 1, tip: "看“音”不看“字母”：hour 的 h 不发音，元音开头，用 an。" }
              ]
            }
        ]
      },
      {
        id: "gr01.2.2",
        title: "零冠词与习惯用法",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr01.2.2-p1",
              kind: "observe",
              title: "免票的老熟人：不加 the 的词",
              point: "球类、棋类、三餐、固定搭配是冠词的'老熟人'——见面免票，不加 the。（直觉版；严格版：泛指/习惯用法用零冠词。）",
              sentences: [
                {
                  id: "gr01.2.2-e1",
                  en: "They play basketball after school.",
                  zh: "他们放学后打篮球。",
                  reg: "通用",
                  tagged: [ { w: "basketball", role: "object", label: "宾语·零冠词" } ]
                },
                {
                  id: "gr01.2.2-e2",
                  en: "I go to school by bike.",
                  zh: "我骑自行车去上学。",
                  reg: "通用",
                  tagged: [ { w: "school", role: "adverb", label: "状语·零冠词" } ]
                },
                {
                  id: "gr01.2.2-e4",
                  en: "We have breakfast at seven.",
                  zh: "我们七点吃早饭。",
                  reg: "通用",
                  tagged: [ { w: "breakfast", role: "object", label: "宾语·零冠词" } ]
                }
              ],
              guess: {
                q: "basketball/school/breakfast 前面为什么都没有 the？",
                options: [ "它们都是'老熟人'，免票", "漏写了 the", "它们是复数" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作零冠词辨析标注 ---------- */
            {
              id: "gr01.2.2-p2",
              kind: "interact",
              title: "免票检查：谁不加 the？",
              exploreTip: "给词块贴标签。basketball（球类）和 school（go to school 固定搭配）都是零冠词——前面不加 the。",
              point: "the 是'特指开关'：一出现，意思就从'做事'变成'去那个地方'。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "play",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "basketball",
                        role: "zero",
                        label: "零冠词"
                      },
                      {
                        w: "after",
                        role: "prep",
                        label: "介词"
                      },
                      {
                        w: "school",
                        role: "zero",
                        label: "零冠词"
                      }
                    ],
                    slots: [
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "zero",
                        label: "零冠词（不加 the）"
                      },
                      {
                        role: "prep",
                        label: "介词"
                      }
                    ],
                    hint: "They play basketball after school.——球类和 go to school 的 school，都是免票老熟人。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：零冠词 + 条件卡 + 反例 ---------- */
            {
              id: "gr01.2.2-p3",
              kind: "explain",
              title: "零冠词：老熟人免票，the 只留给特指",
              lead: "还记得吗？上一页 basketball 和 school 前面都没加 the——它们是免票的老熟人。",
              point: "这就是零冠词：球类棋类三餐、固定搭配，the 免票；the 一出现就变特指。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr01.2.2-e1", "gr01.2.2-e2", "gr01.2.2-e6" ],
                  note: "先看现象：go to school vs go to the school，一字之差，意思全变。"
                },
                {
                  type: "idcard",
                  rule: "零冠词用于：球类/棋类（play basketball）、三餐（have breakfast）、专有名词、固定搭配（go to school 上学，at home 在家）。",
                  condition: "go to school = 去上学（目的）；go to the school = 去学校那个地方（特指）。the 一出现，意思就从'做事'变成'去地方'。"
                },
                {
                  type: "bridge",
                  zh: "汉语'打篮球''上学'本来就没有'那个'，加不加 the 汉语母语者没感觉。",
                  en: "英语里 the 是'特指开关'：play basketball（打篮球这项运动）vs play the basketball（打'那个'篮球——听起来像打某个特定的球，很怪）。",
                  unbridge: "这是英语的习惯规矩：老熟人免票，the 只留给特指。"
                },
                {
                  type: "contrast",
                  wrong: "They play the basketball.",
                  wrongZh: "（✗ 错句：球类加 the）",
                  right: "They play basketball.",
                  why: "球类是运动项目，不是'那个球'——the 一加就怪了。"
                },
                {
                  type: "contrast",
                  wrong: "I go to the school every day.",
                  wrongZh: "（✗ 错句：上学加 the）",
                  right: "I go to school every day.",
                  why: "go to school 是'去上学'；the school 是'学校那个地方'——每天去的是'上学'，不是'参观学校'。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr01.2.2-p4",
              kind: "quiz",
              title: "练一练：the 免票检查",
              point: "自查：球类/棋类/三餐/at home/go to school——the 免票。",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["They play the basketball.", "They play basketball.", "They play a basketball."], answer: 1, tip: "球类是运动项目不是“那个球”：play basketball，the 一加就怪了。" },
                { type: "choice", stem: "“I go to school every day.”的意思是？", options: ["每天去上学", "每天去学校那个地方", "每天在学校玩"], answer: 0, tip: "go to school = 去上学（做事）；go to the school = 去学校那个地方（特指）。" },
                { type: "choice", stem: "下面哪句对？", options: ["I have the breakfast.", "I have breakfast.", "I have a breakfasts."], answer: 1, tip: "三餐是免票老熟人：have breakfast，不加 the。" },
                { type: "fill", stemBefore: "She is", stemAfter: "home now.（“在家”，固定搭配）", answer: "at", accept: ["at"], tip: "at home 是固定搭配：home 前面用 at。" },
                { type: "choice", stem: "the 一出现，意思就从“做事”变成？", options: ["还是做事", "特指某个地方", "没变化"], answer: 1, tip: "the 是“特指开关”：play basketball（打篮球）vs play the basketball（打那个球）。" }
              ]
            }
        ]
      },
      {
        id: "gr01.2.3",
        title: "some/any 与 much/many",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr01.2.3-p1",
              kind: "observe",
              title: "some 和 any：什么时候换？",
              point: "some 在肯定句，any 在否定/疑问句——但 Would you like some tea? 是例外：some 表委婉请求。",
              sentences: [
                {
                  id: "gr01.2.3-e1",
                  en: "I have some apples.",
                  zh: "我有一些苹果。",
                  reg: "通用",
                  tagged: [ { w: "some", role: "attrib", label: "定语·some" }, { w: "apples", role: "object", label: "宾语·可数名词" } ]
                },
                {
                  id: "gr01.2.3-e2",
                  en: "I don't have any money.",
                  zh: "我没有钱。",
                  reg: "通用",
                  tagged: [ { w: "any", role: "attrib", label: "定语·any" }, { w: "money", role: "object", label: "宾语·不可数名词" } ]
                },
                {
                  id: "gr01.2.3-e3",
                  en: "Would you like some tea?",
                  zh: "要来点茶吗？",
                  reg: "口语",
                  tagged: [ { w: "some", role: "attrib", label: "定语·some（例外）" }, { w: "tea", role: "object", label: "宾语·不可数名词" } ]
                }
              ],
              guess: {
                q: "some 和 any 什么时候用？（注意第三句是例外！）",
                options: [ "some 肯定句，any 否定/疑问句", "随便用", "some 否定句，any 肯定句" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——注意第三句 Would you like some tea? 是例外！猜错也没关系。"
              }
            },
            /* ---------- p2 交互页：G1 改作 some/any 可数性标注 ---------- */
            {
              id: "gr01.2.3-p2",
              kind: "interact",
              title: "换词规矩：否定句里 some 待不住",
              exploreTip: "给词块贴标签。否定句里 some 要换成 any——I don't have some money 是错的。",
              point: "some/any 看句式换，much/many 看可数性换——两个维度，别混。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "any",
                        role: "any",
                        label: "any（否定句）"
                      },
                      {
                        w: "money",
                        role: "uncount",
                        label: "不可数名词"
                      },
                      {
                        w: "some",
                        role: "some",
                        label: "some（肯定句）"
                      },
                      {
                        w: "apples",
                        role: "count",
                        label: "可数名词"
                      }
                    ],
                    slots: [
                      {
                        role: "any",
                        label: "any"
                      },
                      {
                        role: "some",
                        label: "some"
                      },
                      {
                        role: "uncount",
                        label: "不可数名词"
                      },
                      {
                        role: "count",
                        label: "可数名词"
                      }
                    ],
                    hint: "I don't have any money, but I have some apples.——否定句 some 换 any，可数不可数也要分清。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：some/any 与 much/many + 条件卡 ---------- */
            {
              id: "gr01.2.3-p3",
              kind: "explain",
              title: "some/any 与 much/many：看句式，看可数性",
              lead: "还记得吗？上一页否定句里 some 被换成了 any——some 在否定句里待不住，是'黑户'。",
              point: "这就是 some/any 与 much/many：some 肯定 any 否定疑问；much 不可数，many 可数。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr01.2.3-e1", "gr01.2.3-e2", "gr01.2.3-e3" ],
                  note: "先看现象：第三句 some 为什么出现在疑问句？"
                },
                {
                  type: "idcard",
                  rule: "some 用于肯定句，any 用于否定句/疑问句/条件句。much + 不可数，many + 可数复数。",
                  condition: "例外：Would you like some…？（委婉请求/期待肯定回答）用 some。much/many 看可数性：much water（不可数），many apples（可数）。"
                },
                {
                  type: "bridge",
                  zh: "汉语'一些'通用，肯定否定都说'一些'，不用换词。",
                  en: "英语不一样：肯定句 some，否定句必须换 any（I don't have any money）——some 在否定句里是'黑户'。",
                  unbridge: "这是英语的换词规矩：句式一变，some/any 跟着换。"
                },
                {
                  type: "contrast",
                  wrong: "I don't have some money.",
                  wrongZh: "（✗ 错句：否定句用 some）",
                  right: "I don't have any money.",
                  why: "否定句里 some 待不住，必须换成 any。"
                },
                {
                  type: "contrast",
                  wrong: "There are much people.",
                  wrongZh: "（✗ 错句：可数用 much）",
                  right: "There are many people.",
                  why: "people 可数，用 many；much 只配不可数（much water）。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr01.2.3-p4",
              kind: "quiz",
              title: "练一练：换词规矩",
              point: "自查：先看肯定还是否定疑问，再看可数还是不可数。",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["I don't have some money.", "I don't have any money.", "I don't have a money."], answer: 1, tip: "否定句里 some 待不住，必须换成 any。" },
                { type: "choice", stem: "下面哪句对？", options: ["There are much people.", "There are many people.", "There is many people."], answer: 1, tip: "people 可数：many + 可数复数；much 只管不可数（much water）。" },
                { type: "fill", stemBefore: "Do you have", stemAfter: "questions?（疑问句，“一些”）", answer: "any", accept: ["any"], tip: "some 肯定，any 否定/疑问/条件——疑问句用 any。" },
                { type: "choice", stem: "“Would you like ___ tea?”（委婉请求）", options: ["some", "any", "many"], answer: 0, tip: "例外：Would you like some…?（委婉请求/期待肯定回答）用 some。" },
                { type: "choice", stem: "“much”后面跟什么？", options: ["可数名词复数", "不可数名词", "单数可数名词"], answer: 1, tip: "much + 不可数（much water）；many + 可数复数（many apples）。" }
              ]
            }
        ]
      }
      ]
    }
  ]
};
